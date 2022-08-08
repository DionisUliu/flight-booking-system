import config from '../var';
import * as sendgridDriver from './sendgrid';
// eslint-disable-next-line no-unused-vars
let mailService: { sendEmail: (params: any) => Promise<unknown> };

switch (config.mailService) {
  case 'sendgrid':
    mailService = sendgridDriver;
    break;
  default:
    mailService = sendgridDriver;
    break;
}
export default mailService;
