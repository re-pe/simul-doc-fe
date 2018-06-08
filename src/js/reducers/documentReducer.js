import * as types from '../actions/action-types';

const initialState = {
  documents: [],
  selected: undefined,
  loadingList: false,
  loadingDocument: false,
};

function documentReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_DOCUMENT_LIST_SUCCESS:
      return {
        ...state,
        documents: [
          ...action.documentList,
        ],
        loadingList: false,
      };
    case types.LOAD_DOCUMENT_LIST_ERROR:
      return {
        ...state,
        documentsError: action.error,
        loadingList: false,
      };
    case types.LOAD_DOCUMENT_LIST:
      return {
        ...state,
        documentsError: undefined,
        loadingList: true,
      };
    case types.LOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        selected: action.document,
        loadingDocument: false,
      };
    case types.LOAD_DOCUMENT_ERROR:
      return {
        ...state,
        documentsError: action.error,
        loadingDocument: false,
      };
    case types.LOAD_DOCUMENT:
      return {
        ...state,
        documentsError: undefined,
        loadingDocument: true,
      };
    case types.DELETE_DOCUMENT_SUCCESS: {
      const newDocs = state.documents.filter(document => document._id !== action.id);
      return {
        ...state,
        documents: [
          ...newDocs,
        ],
        deletingDocument: false,
      };
    }
    case types.DELETE_DOCUMENT_ERROR: {
      return {
        ...state,
        documentsError: action.error,
        deletingDocument: false,
      };
    }
    case types.DELETE_DOCUMENT: {
      return {
        ...state,
        documentsError: undefined,
        deletingDocument: true,
      };
    }
    default:
      return state;
  }
}

export default documentReducer;
