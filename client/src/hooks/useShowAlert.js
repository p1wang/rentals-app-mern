import { useContext } from "react";
import { Context } from "../App";

function useShowAlert() {
  const { alertConfigs, setAlertConfigs } = useContext(Context);

  function showAlert(alertType, alertMessage) {
    setAlertConfigs({
      show: true,
      alertType: alertType,
      alertMessage: alertMessage,
    });
    setTimeout(() => {
      setAlertConfigs({ ...alertConfigs, show: false });
    }, 2000);
  }

  return showAlert;
}

export default useShowAlert;
