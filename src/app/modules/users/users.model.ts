import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 2,
      max: 150,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 150,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 150,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    confirmationLevel: {
      type: Number,
      required: true,
    },

    confirmationToken: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    twoFactorAuth: {
      type: {
        active: {
          type: Boolean,
          required: true,
          default: false,
        },
        secret: {
          type: {
            ascii: { type: 'String' },
            hex: { type: 'String' },
            base32: { type: 'String' },
            otpauth_url: { type: 'String' },
          },
          required: false,
        },
      },
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
