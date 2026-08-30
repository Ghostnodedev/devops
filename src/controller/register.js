const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../db")
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const body = req.body
        console.log(body)

        const { name, email, password } = body

        if (!name || !email || !password) {
            return res.status(401).
                json({ message: "invalid data or missing data" });
        }

        const hash = await bcrypt.hash(password, 10)
        console.log(hash)

        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
            [name, email, hash]
        );

        res.status(201).json({
            message: 'User registered successfully',
            user: result.rows[0]
        });
    } catch (error) {
        if (error.code === '23505') { // Postgres unique violation error code
            return res.status(400).json({ error: 'Email already exists' });
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT id, name, email, created_at FROM users');
    res.status(200).json({ users: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
