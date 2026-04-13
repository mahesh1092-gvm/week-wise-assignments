import exp from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel} from "../models/UserModel.js"
import { verifyToken } from '../middlewares/verifyToken.js';
import { ArticleModel } from '../models/ArticleModel.js';

export const adminApp = exp.Router();

//  Read all users
adminApp.get('/users', verifyToken("ADMIN"), async (req, res) => {
  try {
    const users = await UserModel.find().select('-password');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch users', error: err.message });
  }
});

// Read all articles
adminApp.get('/articles', verifyToken("ADMIN"), async (req, res) => {
  try {
    const articles = await ArticleModel.find()
      .populate('author', 'firstName lastName email')
      .sort({ createdAt: -1 });
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch articles', error: err.message });
  }
});

//  Block an user
adminApp.patch('/users/:id/block', verifyToken("ADMIN"), async (req, res) => {
  try {
    const targetUser = await UserModel.findById(req.params.id).select('-password');

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (targetUser.role === 'ADMIN') {
      return res.status(403).json({ message: 'Admin accounts cannot be blocked' });
    }

    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { isUserActive: false },
      { new: true }
    ).select('-password');

    res.json({ message: 'User blocked', user });
  } catch (err) {
    res.status(500).json({ message: 'Could not block user', error: err.message });
  }
});

//  Activate the user
adminApp.patch('/users/:id/activate', verifyToken("ADMIN"), async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { isUserActive: true },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User activated', user });
  } catch (err) {
    res.status(500).json({ message: 'Could not activate user', error: err.message });
  }
});

// to Change the admin password
adminApp.put('/password', verifyToken("ADMIN"), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }

    const adminId = req.user?.id;
    const admin = await UserModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    const validPassword = await bcrypt.compare(currentPassword, admin.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Could not update password', error: err.message });
  }
});

//  Block the article
adminApp.patch('/articles/:id/block', verifyToken("ADMIN"), async (req, res) => {
  try {
    const article = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      { isArticleActive: false },
      { new: true }
    ).populate('author', 'firstName lastName email');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article blocked', article });
  } catch (err) {
    res.status(500).json({ message: 'Could not block article', error: err.message });
  }
});

//  Activate an article
adminApp.patch('/articles/:id/activate', verifyToken("ADMIN"), async (req, res) => {
  try {
    const article = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      { isArticleActive: true },
      { new: true }
    ).populate('author', 'firstName lastName email');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article activated', article });
  } catch (err) {
    res.status(500).json({ message: 'Could not activate article', error: err.message });
  }
});