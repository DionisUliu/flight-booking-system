import SpeakEasy from 'speakeasy';
import QRCode from 'qrcode';

/**
 * Generates a unique secret key for each user.
 */

export const generateSecret = (userEmail: string) => {
  return SpeakEasy.generateSecret({
    name: `FlightSystem (${userEmail})`,
    length: 32,
    issuer: 'FlightSystem',
  });
};

/**
 * Generates a QR code.
 *
 * @param {String} secret
 */

export const generateQRCode = (secret: any) => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(secret.otpauth_url, (err, imageData) => {
      if (err) {
        reject(err);
      } else {
        resolve(imageData);
      }
    });
  });
};

/**
 * Generates a token from a secret key.
 *
 * @param {String} secret
 */

export const generateToken = (secret: any) => {
  const token = SpeakEasy.totp({
    secret: secret.base32,
    encoding: 'base32',
  });

  return token;
};

/**
 * Verifies a given token.
 *
 * @param {String} secret: User secret key stored on the db
 * @param {String} userToken: Token provided by the user request.
 */

export const validateToken = (secret: any, userToken: string) => {
  return SpeakEasy.totp.verify({
    secret: secret.base32,
    encoding: 'base32',
    token: userToken,
  });
};
