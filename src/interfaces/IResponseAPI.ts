import IPostCode from './IPostCode';

interface IResponseAPI {
    postcode: IPostCode;
    nearest: IPostCode;
}

export default IResponseAPI;