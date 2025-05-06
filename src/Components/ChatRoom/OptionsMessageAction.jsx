import React from 'react';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';

const MessageOptions = ({ messageId, handleDelete, handlePin, isActive }) => {
  return (
    isActive && (
      <div className="absolute bg-white shadow-lg rounded-md p-2 mt-2 right-0">
        <button
          onClick={() => handleDelete(messageId)}
          className="w-full text-red-500 text-sm p-2 hover:bg-gray-200 rounded flex justify-around items-end"
        >
          <FiTrash2 /> <span>Delete</span>
        </button>
        <button
          onClick={handlePin}
          className="w-full text-blue-500 text-sm p-2 hover:bg-gray-200 rounded flex justify-around items-end"
        >
          <FiEdit3 /> <span>Pin</span>
        </button>
      </div>
    )
  );
};

export default MessageOptions;