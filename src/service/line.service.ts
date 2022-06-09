import axios from 'axios';
import { AppConfig } from '../constants';
import Logging from '../utils/logging';

const sendLineNotify = async (message: string) => {
  await axios({
    method: 'post',
    url: 'https://notify-api.line.me/api/notify',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${AppConfig.LINE_TOKEN}`,
    },
    data: `message=${message}`,
  }).catch((err) => Logging.error(err));
};

export default sendLineNotify;
