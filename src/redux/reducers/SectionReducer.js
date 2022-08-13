import { GET_ALL_SECTION_API } from "../types/SectionTypes"

const initialState = {
    arrSections: [],
}

const SectionReducer =(state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_SECTION_API:
    state.arrSections = action.dataSection;
    return { ...state }

  default:
    return { ...state }
  }
}

export default SectionReducer;