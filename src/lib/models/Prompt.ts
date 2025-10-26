import mongoose from 'mongoose';

const PromptSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: String,
  tags: [String],
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isTrending: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

PromptSchema.index({ isTrending: 1, likes: -1 });
PromptSchema.index({ prompt: 'text' });

export default mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);
