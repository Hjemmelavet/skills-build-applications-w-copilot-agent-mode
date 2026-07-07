import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await connectToDatabase();
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                username: 'ava.fit',
                email: 'ava@example.com',
                fullName: 'Ava Martinez',
                fitnessLevel: 'Advanced',
                bio: 'Loves trail runs and strength training.',
            },
            {
                username: 'ben.moves',
                email: 'ben@example.com',
                fullName: 'Ben Carter',
                fitnessLevel: 'Intermediate',
                bio: 'Focuses on cycling and endurance.',
            },
            {
                username: 'nina.flow',
                email: 'nina@example.com',
                fullName: 'Nina Brooks',
                fitnessLevel: 'Beginner',
                bio: 'Enjoys yoga and daily walks.',
            },
        ]);
        await Team.insertMany([
            {
                name: 'Night Runners',
                captain: users[0].username,
                goal: 'Complete a 10K together',
                members: users.slice(0, 2).map((user) => user.username),
            },
            {
                name: 'Peak Pals',
                captain: users[2].username,
                goal: 'Stay active every week',
                members: [users[2].username],
            },
        ]);
        await Activity.insertMany([
            {
                user: users[0].username,
                type: 'Run',
                durationMinutes: 42,
                caloriesBurned: 480,
                date: new Date('2026-07-01T07:00:00.000Z'),
            },
            {
                user: users[1].username,
                type: 'Cycle',
                durationMinutes: 55,
                caloriesBurned: 610,
                date: new Date('2026-07-02T06:30:00.000Z'),
            },
            {
                user: users[2].username,
                type: 'Yoga',
                durationMinutes: 30,
                caloriesBurned: 180,
                date: new Date('2026-07-03T18:00:00.000Z'),
            },
        ]);
        await LeaderboardEntry.insertMany([
            { user: users[0].username, score: 980, streak: 7 },
            { user: users[1].username, score: 941, streak: 4 },
            { user: users[2].username, score: 882, streak: 3 },
        ]);
        await Workout.insertMany([
            {
                title: 'HIIT Cardio Blast',
                difficulty: 'Intermediate',
                focus: 'Cardio',
                durationMinutes: 25,
            },
            {
                title: 'Core Strength Flow',
                difficulty: 'Beginner',
                focus: 'Core',
                durationMinutes: 20,
            },
            {
                title: 'Trail Run Builder',
                difficulty: 'Advanced',
                focus: 'Endurance',
                durationMinutes: 40,
            },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
