import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    fitnessLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    bio: { type: String, default: '' },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    captain: { type: String, required: true },
    goal: { type: String, default: 'Stay active together' },
    members: { type: [String], default: [] },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    user: { type: String, required: true, unique: true },
    score: { type: Number, required: true },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    focus: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);
export const Workout = model('Workout', workoutSchema);
