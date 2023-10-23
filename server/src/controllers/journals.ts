import JournalModel from "../models/journal";
import { RequestHandler } from "express";
import { assertIsDefined } from "../utils/assertIsDefined";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getJournals: RequestHandler = async (req, res, next) => {
    const yearParam = req.query.year;
    const limitParam = req.query.limit;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);

        // If year query provided, fetch journals for that year by authenticated user
        if (yearParam) {
            const yearString = yearParam as string;
            if (!yearString.match(/^\d{4}$/)) {
                throw createHttpError(400, "Invalid year format");
            }

            const year = parseInt(yearString);
            if (year < 1900 || year > new Date().getFullYear()) {
                throw createHttpError(400, "Invalid year - out of range");
            }

            // Get all journals for the authenticated user in the given year
            const journals = await JournalModel.find({
                userId: authenticatedUserId,
                createdAt: {
                    $gte: new Date(year, 0, 1),
                    $lt: new Date(year, 11, 31, 23, 59, 59),
                },
            }).exec();
            res.status(200).json(journals);
        } else if (limitParam) {
            // If limit query provided, fetch journals with limit limit by authenticated user
            const limitString = limitParam as string;
            if (!limitString.match(/^\d+$/)) {
                throw createHttpError(400, "Invalid limit format");
            }

            const limit = parseInt(limitString);
            if (limit < 1) {
                throw createHttpError(400, "Invalid limit - out of range");
            }

            // Get all journals for the authenticated user in the given year
            const journals = await JournalModel.find({
                userId: authenticatedUserId,
            })
                .sort({ createdAt: -1 })
                .limit(limit)
                .exec();
            res.status(200).json(journals);
        } else {
            // Else Get all journals for the authenticated user
            const journals = await JournalModel.find({
                userId: authenticatedUserId,
            }).exec();
            res.status(200).json(journals);
        }
    } catch (error) {
        next(error);
    }
};

export const getActiveYears: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        // Convert the string id to an ObjectId
        const authenticatedUserIdObject = new mongoose.Types.ObjectId(
            authenticatedUserId
        );

        // Get all years in which the authenticated user has created a journal
        const journalCounts = await JournalModel.aggregate([
            {
                $match: {
                    userId: authenticatedUserIdObject,
                },
            },
            {
                $group: {
                    _id: { $year: "$createdAt" },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { _id: -1 },
            },
        ]).exec();

        // Map the results to a simpler format
        const response = journalCounts.map((entry) => ({
            year: entry._id,
            count: entry.count,
        }));

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export const getJournal: RequestHandler = async (req, res, next) => {
    const journalId = req.params.journalId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(journalId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const journal = await JournalModel.findById(journalId).exec();
        if (!journal) {
            throw createHttpError(404, "Journal not found");
        }
        if (!journal.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this journal.");
        }
        res.status(200).json(journal);
    } catch (error) {
        next(error);
    }
};

interface CreateJournalBody {
    title?: string;
    content?: string;
}

export const createJournal: RequestHandler<
    unknown,
    unknown,
    CreateJournalBody,
    unknown
> = async (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!title || !content) {
            throw createHttpError(
                400,
                "Missing required fields title and content"
            );
        }

        const newJournal = await JournalModel.create({
            userId: authenticatedUserId,
            title,
            content,
        });
        res.status(201).json(newJournal);
    } catch (error) {
        next(error);
    }
};

interface UpdateJournalParams {
    journalId: string;
}

interface UpdateJournalBody {
    title?: string;
    content?: string;
}

export const updateJournal: RequestHandler<
    UpdateJournalParams,
    unknown,
    UpdateJournalBody,
    unknown
> = async (req, res, next) => {
    const journalId = req.params.journalId;
    const newTitle = req.body.title;
    const newContent = req.body.content;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(journalId)) {
            throw createHttpError(400, "Invalid journal id");
        }

        if (!newTitle || !newContent) {
            throw createHttpError(
                400,
                "Missing title or content fields to update"
            );
        }

        const journal = await JournalModel.findById(journalId).exec();
        if (!journal) {
            throw createHttpError(404, "Journal not found");
        }
        if (!journal.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this journal.");
        }

        journal.title = newTitle;
        journal.content = newContent;

        const updatedJournal = await journal.save();
        res.status(200).json(updatedJournal);
    } catch (error) {
        next(error);
    }
};

export const deleteJournal: RequestHandler = async (req, res, next) => {
    const journalId = req.params.journalId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(journalId)) {
            throw createHttpError(400, "Invalid journal id");
        }

        const journal = await JournalModel.findByIdAndDelete(journalId).exec();
        if (!journal) {
            throw createHttpError(404, "Journal not found");
        }
        if (!journal.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this journal.");
        }

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
