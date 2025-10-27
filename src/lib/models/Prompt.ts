import mongoose from 'mongoose';

const PromptSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  imageUrl: { type: String }, // Optional for generated prompts
  imageData: { type: String }, // Base64 image data for generated prompts
  imageType: { type: String }, // MIME type of the image
  category: String,
  tags: [String],
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Track who liked it
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublic: { type: Boolean, default: true }, // Public/Private flag
  isGenerated: { type: Boolean, default: false }, // Flag for AI-generated prompts
  isTrending: { type: Boolean, default: false },
  metadata: {
    wordCount: { type: Number },
    characterCount: { type: Number },
    generatedAt: { type: Date },
    model: { type: String }, // AI model used for generation
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes for better query performance
PromptSchema.index({ isTrending: 1, likes: -1 });
PromptSchema.index({ prompt: 'text' });
PromptSchema.index({ userId: 1, isPublic: 1 });
PromptSchema.index({ isPublic: 1, createdAt: -1 });
PromptSchema.index({ isGenerated: 1, isPublic: 1 });

// Update the updatedAt field on save
PromptSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);
