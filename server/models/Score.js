const { Schema, model, Types } = require('mongoose');

const dateFormat = require('../utils/dateFormat')

const ScoreSchema = new Schema (
    {
        score: {
            type: Number,
            required: true
        },
        playlistName: {
            type: String,
            required: true
        },
        playlistID: {
            type: String,
            required: true
        },
        playlistImage: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
          },
    }
);

const Score = model('Score', ScoreSchema)

module.exports = Score