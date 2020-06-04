import './loader.scss';

const SpinningLoader = ({variant = 'normal'}) => 
    <div className={`spinner ${variant}`}>
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    </div>

export default SpinningLoader;