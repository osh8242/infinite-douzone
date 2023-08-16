import { Form } from "react-bootstrap";

export const saveConfirm = (onHide,onsave) => {
    return {
      message: '저장하시겠습니까?',
      onsave:() => onsave(),
      oncancel: () => onHide(),
    };
  };
