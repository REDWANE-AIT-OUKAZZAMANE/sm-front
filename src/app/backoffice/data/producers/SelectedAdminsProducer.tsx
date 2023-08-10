import { ProducerProps } from 'react-async-states';

export const AdminsSelection = {
  SELECT: 'SELECT_ADMIN',
  UNSELECT: 'UNSELECT_ADMIN',
};
export const getSelectedAdminsPostsSource = (
  props: ProducerProps<string[], Error, never, [string, string]>
) => {
  let selectedAdmins: string[] = [];

  if (props.args[0] === AdminsSelection.SELECT) {
    selectedAdmins = [...(props.getState().data as string[]), props.args[1]];
  } else if (props.args[0] === AdminsSelection.UNSELECT) {
    selectedAdmins = (props.getState().data as string[]).filter(
      (id) => id !== props.args[1]
    );
  }

  return selectedAdmins;
};
