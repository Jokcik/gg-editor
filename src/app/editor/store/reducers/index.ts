import * as Editor from './editor';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface CoreState {
  editor: Editor.EditorState;
}

export const editorReducers: ActionReducerMap<CoreState> = {
  editor: Editor.reducerEditor
};

export const getListState = createFeatureSelector<Editor.EditorState>('editor');

export const getSelection = createSelector(
  getListState,
  Editor.getSelection,
);

