import { FC, useEffect, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useAppState } from "../mobx/context/hooks";
import { Alert, SuccessAlert } from "../mobx/stores/alertsStore";
// mui
import { Alert as MuiAlert, Snackbar } from "@mui/material";

const Alerts: FC = () => {
  // state
  const [internalAlert, setInternalAlert] = useState<Alert>(
    new SuccessAlert("")
  );
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const isActive = useAppState((s) => s.alerts.isActive);
  const current = useAppState((s) => s.alerts.current);
  const deactivateAlert = useAppState((s) => s.alerts.deactivateAlert);
  // event handler
  const handleDeactivateAlert = (
    _e: Event | React.SyntheticEvent<any, Event>
  ) => {
    setIsSnackbarOpen(false);
    deactivateAlert();
  };
  // effects
  useEffect(() => {
    if (isActive) {
      setInternalAlert(current!);
      setIsSnackbarOpen(true);
    }
  }, [isActive]);

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={6000}
      onClose={handleDeactivateAlert}
    >
      <MuiAlert variant="filled" severity={internalAlert.kind}>
        {internalAlert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default observer(Alerts);
