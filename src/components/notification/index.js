import { notification } from 'ant-design-vue';

export const openNotification = (type, title, content) => {
    notification[type]({
        message: title,
        description: content
      });
}