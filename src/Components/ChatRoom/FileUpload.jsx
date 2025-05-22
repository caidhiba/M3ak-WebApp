import { FiDownload } from "react-icons/fi";

import React, { useState, useEffect } from 'react';
const FileUpload = ({selectedFile}) => {
    const [file, setFile] = useState(selectedFile);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isfilepdf, setisfilepdf] = useState(false);
    useEffect(() => {
        //Séparer le chemin de fichier à partir du dernier point
         const extension = selectedFile.split('.').pop()
        
        if (extension === 'pdf') {
            setisfilepdf(true)
         }else{
            setisfilepdf(false)
         }
         

    }, [selectedFile]); 


    return (
        <div className="FileUpload">
            { !isfilepdf && (
                <div>
                    <img src={`http://127.0.0.1:8000${selectedFile}`} alt="Preview" className="w-32 h-32 object-cover" />
                </div>
            )}

            {/* Afficher un lien pour télécharger le PDF file && !previewUrl && file.type === 'application/pdf'*/}
            { isfilepdf && (
                <div>
                    <a href={`http://127.0.0.1:8000${selectedFile}`} target="_blank" rel="noopener noreferrer">
                         {/*Télécharger le fichier PDF*/}
                         <FiDownload className="text-gray-500 mr-2 cursor-pointer" />
                    </a>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
