
import {IPostCode}  from '../interfaces';
import {PostCodeRepository} from '../repository';



/**
 *
 * The PostCode service,layer of repository pattern
 * @category Services
 * @class PostCodeService
 */
 class PostCodeService {

     /** 
      * @description create a new postcode
      * @param {IPostCode} postcode
      * @returns {Promise<IPostCode>} a create PostCode
      * @memberof PostCodeService
      */

     async create(postcode: IPostCode): Promise<IPostCode> {
         return new Promise<IPostCode>((resolve, reject) => {
             PostCodeRepository.create(postcode)
             .then((postcode: IPostCode) => resolve(postcode))
             .catch(err => reject(err))
         })
     }
 }