import PropTypes from 'prop-types';

export default function Alert({ message, type, onClose }) {
    const backgroundColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 text-white ${backgroundColor} rounded-md shadow-md`}>
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button onClick={onClose} className="ml-4 text-white font-bold">
                    ✖
                </button>
            </div>
        </div>
    );
}

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    onClose: PropTypes.func.isRequired,
};
