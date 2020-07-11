import './loader.scss';

const SpinningLoader = ({variant = 'normal'}) => 
    <div className={`spinner ${variant}`}>
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
    </div>

export default SpinningLoader;