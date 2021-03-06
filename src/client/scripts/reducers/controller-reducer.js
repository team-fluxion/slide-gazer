import { controller } from '../constants/action-names';

const initialState = {
    isConnected: false,
    presentationCode: '',
    slideCount: 0,
    currentSlideIndex: 0,
    isZoomedIn: false,
    isReadingMode: false,
    presentationProgress: 0
};

const controllerReducer = (state = initialState, action) => {
    switch (action.type) {
    case controller.setInitialPresentationCode:
        return {
            ...state,
            presentationCode: action.payLoad
        };
    case controller.changePresentationCode:
        return {
            ...state,
            presentationCode: action.payLoad
        };
    case controller.startControllingPresentation:
        return {
            ...state,
            isConnected: true,
            slideCount: action.payLoad,
            currentSlideIndex: 0,
            presentationProgress: 0
        };
    case controller.showSlide:
        return {
            ...state,
            currentSlideIndex: action.payLoad.slideIndex,
            presentationProgress: action.payLoad.presentationProgress
        };
    case controller.zoomIn:
        return {
            ...state,
            isZoomedIn: true
        };
    case controller.zoomOut:
        return {
            ...state,
            isZoomedIn: false
        };
    case controller.toggleReadingMode:
        return {
            ...state,
            isReadingMode: !state.isReadingMode
        };
    case controller.reset:
        return {
            ...state,
            isConnected: false,
            presentationCode: '',
            slideCount: 0,
            currentSlideIndex: 0,
            isReadingMode: false,
            presentationProgress: 0
        };
    default:
        return state;
    }
};

export default controllerReducer;
