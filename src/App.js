import React, { useState } from 'react';

const AuditApp = () => {
  const [activeTab, setActiveTab] = useState('audits');
  const [selectedRow, setSelectedRow] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [, setCurrentAuditId] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'editor'
  
  // Store all audits
  const [allAudits, setAllAudits] = useState([
    {
      id: 1,
      title: 'AUDIT XXXXX',
      auditor: 'MOHAMED ALI FRADI',
      auditee: 'R&S PROJET X',
      date: '2025-06-15',
      status: 'En cours',
      items: [
        { no: 1, question: 'Vérification des documents qualité', response: 'OK', commentaire: 'Tous les documents sont à jour' },
        { no: 2, question: 'Respect des procédures de sécurité', response: 'NOT OK', commentaire: 'Équipements de protection manquants' },
        { no: 3, question: 'Formation du personnel', response: 'OK', commentaire: '' },
        { no: 4, question: 'Maintenance préventive', response: 'NC', commentaire: 'Planning à mettre à jour' },
        { no: 5, question: 'Traçabilité des produits', response: '', commentaire: '' }
      ]
    },
    {
      id: 2,
      title: 'AUDIT YYYYY',
      auditor: 'MOHAMED ALI FRADI',
      auditee: 'SERVICE PRODUCTION',
      date: '2025-06-10',
      status: 'Terminé',
      items: [
        { no: 1, question: 'Propreté des locaux', response: 'OK', commentaire: 'Conforme aux standards' },
        { no: 2, question: 'Gestion des déchets', response: 'OK', commentaire: 'Tri correct' },
        { no: 3, question: 'Stockage des matières premières', response: 'NOT OK', commentaire: 'Zone de stockage encombrée' },
        { no: 4, question: 'Contrôle qualité', response: 'OK', commentaire: '' },
        { no: 5, question: 'Documentation des processus', response: 'NA', commentaire: 'En cours de révision' }
      ]
    }
  ]);

  // Current audit being edited
  const [currentAudit, setCurrentAudit] = useState(null);

  // Calculate percentage of answered questions for any audit
  const calculateProgress = (auditItems) => {
    const totalQuestions = auditItems.length;
    const OK_Response = auditItems.filter(item => item.response && item.response === 'OK').length;
    console.log(OK_Response,"OK RESPONSE");
    
    return totalQuestions > 0 ? Math.round((OK_Response / totalQuestions) * 100) : 0;
  };

  // Create new audit
  const createNewAudit = () => {
    const newId = Math.max(...allAudits.map(a => a.id)) + 1;
    const newAudit = {
      id: newId,
      title: `AUDIT ${String(newId).padStart(5, '0')}`,
      auditor: 'MOHAMED ALI FRADI',
      auditee: '',
      date: new Date().toISOString().split('T')[0],
      status: 'En cours',
      items: [
        { no: 1, question: 'Nomenclature normalisée', response: '', commentaire: '' },
        { no: 2, question: 'Utilisation des sous-processus', response: '', commentaire: '' },
        { no: 3, question: 'Utilisation correcte des gateways', response: '', commentaire: '' },
        { no: 4, question: 'Événements de début et fin', response: '', commentaire: '' },
        { no: 5, question: 'Modèle lisible visuellement', response: '', commentaire: '' },
        { no: 6, question: 'Utilisation correcte des pools et lanes (participants)', response: '', commentaire: '' },
        { no: 7, question: 'Documentation BPMN intégrée', response: '', commentaire: '' },
        { no: 8, question: 'Optimisation de la modélisation', response: '', commentaire: '' }

      ]
    };

    
    setAllAudits([...allAudits, newAudit]);
    setCurrentAudit(newAudit);
    setCurrentAuditId(newId);
    setActiveTab('audits');
    setViewMode('editor');
    setSelectedRow(0);
  };

  // Select audit to edit
  const selectAudit = (audit) => {
    setCurrentAudit(audit);
    setCurrentAuditId(audit.id);
    setViewMode('editor');
    setSelectedRow(0);
  };

  // Update current audit in the list
  const updateCurrentAudit = (updatedAudit) => {
    setCurrentAudit(updatedAudit);
    setAllAudits(allAudits.map(audit => 
      audit.id === updatedAudit.id ? updatedAudit : audit
    ));
  };

  // Print function
  const printAudit = () => {
    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Audit Report - ${currentAudit.title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
          .audit-info { background: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          .response-ok { background-color: #d4edda; color: #155724; }
          .response-not-ok { background-color: #f8d7da; color: #721c24; }
          .response-nc { background-color: #fff3cd; color: #856404; }
          .response-na { background-color: #e2e3e5; color: #383d41; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>RAPPORT D'AUDIT</h1>
          <h2>${currentAudit.title}</h2>
        </div>
        <div class="audit-info">
          <p><strong>Auditeur:</strong> ${currentAudit.auditor}</p>
          <p><strong>Audité:</strong> AYOUB BEN KHEROUN</p>
          <p><strong>Date:</strong> ${new Date(currentAudit.date).toLocaleDateString('fr-FR')}</p>
          <p><strong>Taux de conformités:</strong> ${calculateProgress(currentAudit.items)}%</p>
        </div>
        <table>
          <thead>
            <tr><th>NO</th><th>RÉ</th><th>RÉPONSE</th><th>COMMENTAIRE</th></tr>
          </thead>
          <tbody>
            ${currentAudit.items.map(item => `
              <tr>
                <td>${item.no}</td>
                <td>${item.question || 'Pas de question'}</td>
                <td class="${item.response === 'OK' ? 'response-ok' : 
                  item.response === 'NOT OK' ? 'response-not-ok' : 
                  item.response === 'NC' ? 'response-nc' : 
                  item.response === 'NA' ? 'response-na' : ''}">${item.response || 'Pas de réponse'}</td>
                <td>${item.commentaire || 'Pas de commentaire'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer">
          <p>Rapport généré le ${new Date().toLocaleString('fr-FR')}</p>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `;
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  const getResponseClass = (response) => {
    switch(response) {
      case 'OK': return 'bg-green-100 text-green-800';
      case 'NOT OK': return 'bg-red-100 text-red-800';
      case 'NC': return 'bg-yellow-100 text-yellow-800';
      case 'NA': return 'bg-gray-100 text-gray-800';
      default: return '';
    }
  };

  const setResponse = (response) => {
    if (selectedRow !== null && currentAudit) {
      const updatedAudit = {
        ...currentAudit,
        items: currentAudit.items.map((item, index) => 
          index === selectedRow ? { ...item, response } : item
        )
      };
      updateCurrentAudit(updatedAudit);
    }
  };

  const updateQuestion = (index, newQuestion) => {
    const updatedAudit = {
      ...currentAudit,
      items: currentAudit.items.map((item, i) => 
        i === index ? { ...item, question: newQuestion } : item
      )
    };
    updateCurrentAudit(updatedAudit);
  };

  const updateComment = (index, newComment) => {
    const updatedAudit = {
      ...currentAudit,
      items: currentAudit.items.map((item, i) => 
        i === index ? { ...item, commentaire: newComment } : item
      )
    };
    updateCurrentAudit(updatedAudit);
  };

  const updateAuditInfo = (field, value) => {
    const updatedAudit = { ...currentAudit, [field]: value };
    updateCurrentAudit(updatedAudit);
  };

  const openComment = () => {
    if (selectedRow !== null) {
      setEditingComment(selectedRow);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'quiter') {
      if (window.confirm('Êtes-vous sûr de vouloir quitter?')) {
        alert('Fonction de sortie');
      }
    } else if (tab === 'demarrer') {
      createNewAudit();
    } else if (tab === 'audits') {
      // Reset to list view when clicking on audits tab
      setViewMode('list');
      setCurrentAudit(null);
      setCurrentAuditId(null);
    }
  };

  const terminateAudit = () => {
    if (window.confirm('Êtes-vous sûr de vouloir terminer cet audit?')) {
      const updatedAudit = { ...currentAudit, status: 'Terminé' };
      updateCurrentAudit(updatedAudit);
      setViewMode('list');
      setCurrentAudit(null);
      setCurrentAuditId(null);
      alert('Audit terminé avec succès!');
    }
  };

  const deleteAudit = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet audit?')) {
      setAllAudits(allAudits.filter(audit => audit.id !== currentAudit.id));
      setViewMode('list');
      setCurrentAudit(null);
      setCurrentAuditId(null);
      alert('Audit supprimé');
    }
  };

  const goBackToList = () => {
    setViewMode('list');
    setCurrentAudit(null);
    setCurrentAuditId(null);
  };

  // Render audit list view
  const renderAuditsList = () => (
    <div className="p-5 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mes Audits</h2>
        <button 
          onClick={createNewAudit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          + Nouvel Audit
        </button>
      </div>
      
      <div className="grid gap-4">
        {allAudits.map(audit => (
          <div 
            key={audit.id} 
            className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => selectAudit(audit)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-blue-700">{audit.title}</h3>
              <span className={`px-3 py-1 rounded text-sm font-medium ${
                audit.status === 'Terminé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {audit.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
              <div><strong>Auditeur:</strong> {audit.auditor}</div>
              <div><strong>Date:</strong> {new Date(audit.date).toLocaleDateString('fr-FR')}</div>
              <div><strong>Audité:</strong> {audit.auditee || 'Non défini'}</div>
              <div><strong>Avancement:</strong> {calculateProgress(audit.items)}%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${calculateProgress(audit.items)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  // Render audit editor view
  const renderAuditEditor = () => {
    if (!currentAudit) {
      return (
        <div className="p-5 bg-white text-center">
          <h3 className="text-xl text-gray-600 mb-4">Aucun audit sélectionné</h3>
          <button 
            onClick={createNewAudit}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
          >
            Créer un nouvel audit
          </button>
        </div>
      );
    }

    return (
      <div className="p-5 bg-white">
        {/* Audit Info Editor */}
        <div className="mb-4 p-4 bg-gray-50 rounded">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre de l'audit</label>
              <input
                type="text"
                value={currentAudit.title}
                onChange={(e) => updateAuditInfo('title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audité</label>
              <input
                disabled
                type="text"
                value='Ayoub BEN KHIROUN'
                onChange={(e) => updateAuditInfo('auditee', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              
              />
            </div>
          </div>
        </div>

        <h3 className="text-gray-700 mb-4 text-lg"> Points à audités</h3>
        
      <div className="border border-gray-300 rounded overflow-hidden mb-5">
  <table className="w-full border-collapse">
    <thead>
      <tr>
        <th className="bg-gray-50 p-3 text-left border-b border-gray-300 font-bold text-gray-700 w-12">NO</th>
        <th className="bg-gray-50 p-3 text-left border-b border-gray-300 font-bold text-gray-700 w-2/5">REGLES</th>
        <th className="bg-gray-50 p-3 text-left border-b border-gray-300 font-bold text-gray-700 w-20">RÉPONSE</th>
        <th className="bg-gray-50 p-3 text-left border-b border-gray-300 font-bold text-gray-700">COMMENTAIRE</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan="4" className="text-center border-b border-gray-300 py-1 text-sm  text-gray-500 font-bold">Modèlisation</td>
      </tr>
      {currentAudit.items.map((item, index) => (
        <tr
          key={index}
          className={`cursor-pointer border-b border-gray-200 transition-colors ${
            selectedRow === index ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'
          }`}
          onClick={() => setSelectedRow(index)}
        >
          <td className="p-3 font-medium">{item.no}</td>
          <td className="p-3">
            <input
              disabled
              type="text"
              value={item.question}
              onChange={(e) => updateQuestion(index, e.target.value)}
              placeholder="Saisir votre question ici..."
              className={`w-full p-2 border rounded transition-colors ${
                selectedRow === index
                  ? 'bg-white bg-opacity-20 border-white border-opacity-50 text-white placeholder-gray-200'
                  : 'border-gray-300 text-gray-700 focus:border-blue-500 focus:outline-none'
              }`}
              onClick={(e) => e.stopPropagation()}
            />
          </td>
          <td className="p-3">
            {item.response ? (
              <span className={`inline-block px-3 py-2 rounded text-sm font-bold min-w-16 text-center ${
                selectedRow === index ? 'bg-white bg-opacity-20' : getResponseClass(item.response)
              }`}>
                {item.response}
              </span>
            ) : (
              <span className={`inline-block px-3 py-2 rounded text-sm text-center min-w-16 ${
                selectedRow === index ? 'text-gray-200' : 'text-gray-400'
              }`}>
                {selectedRow === index ? 'Sélectionner' : 'Pas de réponse'}
              </span>
            )}
          </td>
          <td className="p-3">
            {editingComment === index ? (
              <input
                type="text"
                value={item.commentaire}
                onChange={(e) => updateComment(index, e.target.value)}
                onBlur={() => setEditingComment(null)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setEditingComment(null);
                  }
                }}
                placeholder="Tapez votre commentaire ici..."
                className={`w-full p-2 border rounded transition-colors ${
                  selectedRow === index
                    ? 'bg-white bg-opacity-20 border-white border-opacity-50 text-white placeholder-gray-200'
                    : 'border-gray-300 text-gray-700 focus:border-blue-500 focus:outline-none'
                }`}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span
                className={`text-sm cursor-pointer hover:underline ${
                  selectedRow === index ? 'text-white' : 'text-gray-700'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingComment(index);
                }}
              >
                {item.commentaire || 'Pas de commentaire'}
              </span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


        {/* Bottom Action Bar */}
        <div className="mt-5">
          <div className="mb-3 text-sm text-gray-600 text-center">
            {selectedRow !== null ? (
              <span>Ligne sélectionnée {selectedRow + 1}: Cliquez sur un bouton ci-dessous pour définir la réponse</span>
            ) : (
              <span>Sélectionnez une ligne ci-dessus pour définir sa réponse</span>
            )}
          </div>
          <div className="flex justify-center gap-4 items-center flex-wrap">
            <button
              className={`flex flex-col items-center gap-1 p-3 border border-green-500 bg-white cursor-pointer rounded text-green-600 transition-all hover:-translate-y-1 hover:shadow-lg ${
                selectedRow === null ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => setResponse('OK')}
              disabled={selectedRow === null}
              title="Conforme"
            >
              <span className="text-xl">👍</span>
              <span className="text-sm">OK</span>
            </button>
            <button
              className={`flex flex-col items-center gap-1 p-3 border border-red-500 bg-white cursor-pointer rounded text-red-600 transition-all hover:-translate-y-1 hover:shadow-lg ${
                selectedRow === null ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => setResponse('NOT OK')}
              disabled={selectedRow === null}
              title="Non conforme"
            >
              <span className="text-xl">👎</span>
              <span className="text-sm">NOT OK</span>
            </button>
            <button
              className={`flex flex-col items-center gap-1 p-3 border border-yellow-500 bg-white cursor-pointer rounded text-yellow-600 transition-all hover:-translate-y-1 hover:shadow-lg ${
                selectedRow === null ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => setResponse('NC')}
              disabled={selectedRow === null}
              title="Non conforme"
            >
              <span className="text-xl">⚠️</span>
              <span className="text-sm">NC</span>
            </button>
            <button
              className={`flex flex-col items-center gap-1 p-3 border border-gray-500 bg-white cursor-pointer rounded text-gray-600 transition-all hover:-translate-y-1 hover:shadow-lg ${
                selectedRow === null ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => setResponse('NA')}
              disabled={selectedRow === null}
              title="Non applicable"
            >
              <span className="text-xl">🚫</span>
              <span className="text-sm">NA</span>
            </button>
            <button
              className={`flex flex-col items-center gap-1 p-3 border border-blue-500 bg-white cursor-pointer rounded text-blue-600 transition-all hover:-translate-y-1 hover:shadow-lg ${
                selectedRow === null ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={openComment}
              disabled={selectedRow === null}
              title="Ajouter un commentaire"
            >
              <span className="text-xl">💬</span>
              <span className="text-sm">Commentaire</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gray-200 flex items-center justify-center px-3 py-1 border-b border-gray-300">
        <div className="text-blue-700 font-bold flex items-center gap-2">
          MOHAMED ALI FRADI <span>👤</span>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-blue-700 flex justify-center text-white">
        <div className="flex">
          {['quiter', 'demarrer', 'audits', 'actions', 'planning', 'reporting'].map((tab) => (
            <div
              key={tab}
              className={`px-5 py-3 cursor-pointer border-r border-blue-800 transition-colors hover:bg-blue-800 ${
                activeTab === tab ? 'bg-blue-800' : ''
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab === 'quiter' ? 'Quiter' : 
               tab === 'demarrer' ? 'Démarrer AUDIT' :
               tab.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* Audit Info Bar - Only show when editing an audit */}
      {currentAudit && activeTab === 'audits' && viewMode === 'editor' && (
        <div className="bg-blue-500 text-white px-5 py-2 text-sm">
          {currentAudit.title} I Auditeur : {currentAudit.auditor} I Audité : {currentAudit.auditee || 'Non défini'} I
          Taux de conformités : {calculateProgress(currentAudit.items)}% I Statut : {currentAudit.status}
        </div>
      )}

      {/* Action Buttons - Only show when editing an audit */}
      {currentAudit && activeTab === 'audits' && viewMode === 'editor' && (
        <div className="bg-gray-100 px-5 py-2 flex justify-center gap-3 border-b border-gray-300">
          <button 
            className="px-3 py-1 border border-gray-400 bg-white cursor-pointer rounded text-xs hover:bg-gray-50 transition-colors"
            onClick={goBackToList}
          >
            ← Liste des audits
          </button>
          <button 
            className="px-3 py-1 border border-gray-400 bg-white cursor-pointer rounded text-xs hover:bg-gray-50 transition-colors"
            onClick={printAudit}
          >
            Imprimer
          </button>
          <button 
            className="px-3 py-1 border border-gray-400 bg-white cursor-pointer rounded text-xs hover:bg-gray-50 transition-colors"
            onClick={terminateAudit}
          >
            Terminer
          </button>
          <button 
            className="px-3 py-1 border border-gray-400 bg-white cursor-pointer rounded text-xs hover:bg-gray-50 transition-colors"
            onClick={deleteAudit}
          >
            Supprimer
          </button>
        </div>
      )}

      {/* Main Content */}
      {activeTab === 'audits' && viewMode === 'editor' ? renderAuditEditor() : 
       activeTab === 'audits' && viewMode === 'list' ? renderAuditsList() : 
       activeTab === 'audits' ? renderAuditsList() : (
        <div className="p-5 bg-white text-center">
          <h3 className="text-xl text-gray-600">
            {activeTab === 'actions' && 'Gestion des Actions'}
            {activeTab === 'planning' && 'Planning des Audits'}  
            {activeTab === 'reporting' && 'Rapports et Statistiques'}
          </h3>
          <p className="text-gray-500 mt-2">Cette section sera implémentée prochainement</p>
        </div>
      )}
    </div>
  );
};

export default AuditApp;