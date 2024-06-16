// src/components/Button.js
export default function Button({ title }) {
    return (
        <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-200"
        >
            {title}
        </button>
    );
}
