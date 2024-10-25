import PropTypes from 'prop-types'
import { guitarraPropTypes } from '../utils/propTypes';

export default function CardGuitarra({ guitar, addToCart}) {
    const { name, image, content, price } = guitar;

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={image} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{content }</p>  
                <p className="fw-black text-primary fs-3">$ {price} </p>
                <button type="button" onClick={() => addToCart(guitar)} 
                className="btn btn-dark w-100">Agregar al Carrito</button>
            </div> 
        </div>
    );
}

CardGuitarra.propTypes = {
    guitar: guitarraPropTypes.isRequired,
    addToCart: PropTypes.func.isRequired
};

