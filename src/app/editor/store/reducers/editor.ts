import {CHANGE_SELECTION, EditorAction} from '../actions/editor';
import {SelectionEditor} from '../../models';

export interface EditorState {
  selection: SelectionEditor;
}

export const initialState: EditorState = {
  selection: new SelectionEditor()
};

export function reducerEditor(state: EditorState = initialState, action: EditorAction): EditorState {
  console.log('reduCER', action.type, action.payload);
  switch (action.type) {
    case CHANGE_SELECTION: {
      return {
        ...state,
        selection: action.payload
      }
    }

    default:
      return state;
  }
}

export const getSelection = (state: EditorState) => state.selection;
