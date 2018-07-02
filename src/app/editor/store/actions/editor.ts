import {Action} from '@ngrx/store';
import {SelectionEditor} from '../../models';

export const CHANGE_SELECTION = '[EDITOR] CHANGE_SELECTION';

export class Selection implements Action {
  readonly type = CHANGE_SELECTION;

  constructor(public payload: SelectionEditor) {
  }
}

export type EditorAction = Selection;
