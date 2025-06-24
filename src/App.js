import React, { useState } from 'react';
import imageAmaris from './assets/image-amaris.png';
import imageBouyeges from './assets/image-bouygues.png';


const AuditApp = () => {
  // ----------- AUTH STATE -----------
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ login: '', password: '' });

  // ----------- MAIN APP STATE -----------
  const [setupMode, setSetupMode] = useState(false);
  const [setupData, setSetupData] = useState({ auditee: '', type: '', department: '' });
  const [activeTab, setActiveTab] = useState('audits');
  const [selectedRow, setSelectedRow] = useState({ table: 'model', index: null }); // Table: 'model' or 'tech'
  const [editingComment, setEditingComment] = useState({ table: null, index: null });
  const [, setCurrentAuditId] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [allAudits, setAllAudits] = useState([
    {
      id: 1,
      title: 'AUDIT XXXXX',
      auditor: 'MOHAMED ALI FRADI',
      auditee: 'R&S PROJET X',
      date: '2025-06-15',
      status: 'En cours',
      items: [
        { no: 1, question: 'Nomenclature normalisée', response: 'OK', commentaire: 'Tous les documents sont à jour' },
        { no: 2, question: 'Utilisation des sous-processus', response: 'NOT OK', commentaire: 'Bien fait' },
        { no: 3, question: 'Utilisation correcte des gateways', response: 'OK', commentaire: '' },
        { no: 4, question: 'Événements de début et fin', response: 'NC', commentaire: 'Manque documentation' },
        { no: 5, question: 'Modèle lisible visuellement', response: '', commentaire: '' },
        { no: 6, question: 'Utilisation correcte des pools et lanes (participants)', response: 'OK', commentaire: '' },
        { no: 7, question: 'Documentation BPMN intégrée', response: 'NC', commentaire: 'A Mettre à jour' },
        { no: 8, question: 'Optimisation de la modélisation', response: 'OK', commentaire: '' }
      ],
      technical:
        [
          { no: 1, question: 'Mapping clair des erreurs attendues dans les connecteurs', response: 'OK', commentaire: 'Tous les documents sont à jour' },
          { no: 2, question: 'Tests de bout en bout', response: 'NOT OK', commentaire: 'Bien fait' },
          { no: 3, question: 'Intégration des formulaires de tâches utilisateur', response: 'OK', commentaire: '' },
          { no: 4, question: 'Mise en place d’un système de retry dans les workers', response: 'NC', commentaire: 'Manque documentation' },
          { no: 5, question: 'Vérification des timeouts et durées d’expiration des jobs', response: '', commentaire: '' },
          { no: 5, question: 'Validation avec métier', response: 'OK', commentaire: '' }


        ],
    }
  ]);
  const [currentAudit, setCurrentAudit] = useState(null);
  const departments = [
    "DI FTTA",
    "DI ZTD",
    "DI CSG - TRANS FTTA",
    "DI RAN4",
    "DI FH",
    "DI DEMONTAGE RADIO",
    "DI VERCORS",
    "DI_CROZON",
    "VDR RADIO CZ",
    "AMBI MOBILE CZ",
    "AMBI MOBILE ZTD",
    "VDR FH",
    "RENO CZ",
    "DEMONT ROUT TRAP"
  ];
  const domains = [
    "Fixe",
    "Transport",
    "Mobile-Radio",
    "Mobile-Trans",
    "Transverse"
  ]

  // ----------- LOGIN INTERFACE -----------
  const completeAuditSetup = () => {
    const newId = Math.max(...allAudits.map(a => a.id), 0) + 1;
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
      ],
      technical:
        [
          { no: 1, question: 'Mapping clair des erreurs attendues dans les connecteurs', response: '', commentaire: '' },
          { no: 2, question: 'Tests de bout en bout', response: '', commentaire: '' },
          { no: 3, question: 'Intégration des formulaires de tâches utilisateur', response: '', commentaire: '' },
          { no: 4, question: 'Mise en place d’un système de retry dans les workers', response: '', commentaire: '' },
          { no: 5, question: 'Vérification des timeouts et durées d’expiration des jobs', response: '', commentaire: '' },
          { no: 5, question: 'Validation avec métier', response: '', commentaire: '' }


        ],
    };
    setAllAudits([...allAudits, newAudit]);
    setCurrentAudit(newAudit);
    setCurrentAuditId(newId);
    setActiveTab('audits');
    setViewMode('editor');
    setSelectedRow({ table: 'model', index: 0 });
    setSetupMode(false);
  };
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-sm relative overflow-hidden">

          {/* Top Logo */}
          <div className="flex justify-center mb-6">
            <img src={imageAmaris} alt="Logo Amaris" className="h-14 object-contain" />
          </div>

          <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
            AMARIS-AuditApp
          </h2>

          <form
            onSubmit={e => {
              e.preventDefault();
              setLoggedIn(true);
            }}
          >
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">Login</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                autoComplete="username"
                value={loginData.login}
                onChange={e => setLoginData(d => ({ ...d, login: e.target.value }))}
                placeholder="Nom d'utilisateur"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm text-gray-700 mb-1">Mot de passe</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                autoComplete="current-password"
                value={loginData.password}
                onChange={e => setLoginData(d => ({ ...d, password: e.target.value }))}
                placeholder="Mot de passe"
                required
              />
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition duration-200"
              type="submit"
            >
              Se connecter
            </button>
          </form>

          {/* Bottom Logo */}
          <div className="flex justify-center mt-8">
            <img src={imageBouyeges} alt="Logo Bouygues" className="h-12 object-contain" />
          </div>
        </div>
      </div>

    );

  } else if (setupMode) {
    return (
      <div className="p-10 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-center text-blue-700">Initialiser un Nouvel Audit</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Audité</label>
            <select
              value={setupData.auditee}
              onChange={e => setSetupData({ ...setupData, auditee: e.target.value })}
              className="w-full p-2 border rounded"
              disabled
            >
              <option value="Ayoub BEN KHIROUN">Ayoub BEN KHIROUN</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Domaine </label>
            <select
              value={setupData.type}
              onChange={e => setSetupData({ ...setupData, type: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Sélectionnez le domaine--</option>
              {domains.map(dom => (
                <option key= {dom} value={dom}>{dom}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Processus</label>
            <select
              value={setupData.department}
              onChange={e => setSetupData({ ...setupData, department: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Sélectionnez le processus --</option>
              {departments.map(dep => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>
          <div className="pt-4 text-center">
            <button
              disabled={ !setupData.type || !setupData.department}
              onClick={completeAuditSetup}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------- PROGRESS CALC -----------
  const calculateProgress = (auditItems, auditItems2) => {
    const totalQuestions = auditItems.length + auditItems2.length;
    console.log(totalQuestions, "totalQuest");

    const OK_Response = auditItems.filter(item => item.response && item.response === 'OK').length;
    return totalQuestions > 0 ? Math.round((OK_Response / totalQuestions) * 100) : 0;
  };

  // ----------- AUDIT CRUD -----------
  const createNewAudit = () => {
    setSetupMode(true);
  };

  const selectAudit = (audit) => {
    setCurrentAudit(audit);
    setCurrentAuditId(audit.id);
    setViewMode('editor');
    setSelectedRow({ table: 'model', index: 0 });
  };

  const updateCurrentAudit = (updatedAudit) => {
    setCurrentAudit(updatedAudit);
    setAllAudits(allAudits.map(audit => audit.id === updatedAudit.id ? updatedAudit : audit));
  };

  // ----------- DECISION/COMMENT BAR -----------
  const setResponse = (response) => {
    if (!currentAudit || selectedRow.index === null) return;
    let updatedAudit = { ...currentAudit };
    if (selectedRow.table === 'model') {
      updatedAudit.items = updatedAudit.items.map((item, i) =>
        i === selectedRow.index ? { ...item, response } : item
      );
    } else {
      updatedAudit.technical = updatedAudit.technical.map((item, i) =>
        i === selectedRow.index ? { ...item, response } : item
      );
    }
    updateCurrentAudit(updatedAudit);
  };

  const updateComment = (table, index, newComment) => {
    let updatedAudit = { ...currentAudit };
    if (table === 'model') {
      updatedAudit.items = updatedAudit.items.map((item, i) =>
        i === index ? { ...item, commentaire: newComment } : item
      );
    } else {
      updatedAudit.technical = updatedAudit.technical.map((item, i) =>
        i === index ? { ...item, commentaire: newComment } : item
      );
    }
    updateCurrentAudit(updatedAudit);
  };

  // ----------- PRINTING -----------
  const printAudit = () => {
    const audit = currentAudit;

    const printTable = (title, items) => `
    <h3>${title}</h3>
    <table>
      <thead>
        <tr><th>NO</th><th>RÈGLE</th><th>RÉPONSE</th><th>COMMENTAIRE</th></tr>
      </thead>
      <tbody>
        ${items.map(item => `
          <tr>
            <td>${item.no}</td>
            <td>${item.question}</td>
            <td>${item.response || 'Pas de réponse'}</td>
            <td>${item.commentaire || 'Pas de commentaire'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

    const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Audit Report - ${audit.title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          line-height: 1.4;
          color: #333;
          font-size: 13px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #333;
          padding-bottom: 8px;
          margin-bottom: 16px;
        }

        .header-logo {
          max-height: 45px;
        }

        .header-title {
          flex-grow: 1;
          text-align: center;
        }

        .header-title h1 {
          margin: 0;
          font-size: 20px;
        }

        .header-title h2 {
          margin: 4px 0 0;
          font-size: 15px;
          color: #444;
        }

        .audit-info {
          background: #f9f9f9;
          padding: 10px 14px;
          margin-bottom: 16px;
          border-radius: 4px;
          border-left: 3px solid #007BFF;
        }

        .table-wrapper {
          display: grid;
          grid-template-columns: 1fr;
        }

        table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 12px;
        }

        th, td {
          border: 1px solid #ccc;
          padding: 6px 8px;
          text-align: left;
          vertical-align: top;
          word-wrap: break-word;
        }

        th:nth-child(1), td:nth-child(1) { width: 6%; }   /* NO */
        th:nth-child(2), td:nth-child(2) { width: 34%; }  /* RÈGLE */
        th:nth-child(3), td:nth-child(3) { width: 30%; }  /* RÉPONSE */
        th:nth-child(4), td:nth-child(4) { width: 30%; }  /* COMMENTAIRE */

        th {
          background-color: #f0f4f8;
          font-weight: 600;
          color: #222;
        }

        tbody tr:nth-child(even) {
          background-color: #fdfdfd;
        }

        h3 {
          margin-top: 16px;
          margin-bottom: 6px;
          font-size: 14px;
          color: #007BFF;
        }

        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 11px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="${imageAmaris}" alt="Logo Amaris" class="header-logo" />
        <div class="header-title">
          <h1>RAPPORT D'AUDIT</h1>
          <h2>${audit.title}</h2>
        </div>
        <img src="${imageBouyeges}" alt="Logo Bouygues" class="header-logo" />
      </div>

      <div class="audit-info">
        <p><strong>Auditeur:</strong> ${audit.auditor}</p>
        <p><strong>Audité:</strong> ${audit.auditee || 'Non défini'}</p>
        <p><strong>Date:</strong> ${new Date(audit.date).toLocaleDateString('fr-FR')}</p>
        <p><strong>Taux de conformités:</strong> ${calculateProgress(audit.items, audit.technical)}%</p>
      </div>

      <div class="table-wrapper">
        ${printTable('Modélisation', audit.items)}
        ${printTable('Migration', audit.technical)}
      </div>

      <div class="footer">
        Rapport généré le ${new Date().toLocaleString('fr-FR')}
      </div>

      <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>
  `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
  };



  // ----------- ACTIONS -----------
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

  // ----------- RENDER HELPERS -----------
  const getResponseClass = (response) => {
    switch (response) {
      case 'OK': return 'bg-green-100 text-green-800';
      case 'NOT OK': return 'bg-red-100 text-red-800';
      case 'NC': return 'bg-yellow-100 text-yellow-800';
      case 'NA': return 'bg-gray-100 text-gray-800';
      default: return '';
    }
  };

  // ----------- MAIN UI -----------

  // --- Audit List
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
              <span className={`px-3 py-1 rounded text-sm font-medium ${audit.status === 'Terminé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                {audit.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
              <div><strong>Auditeur:</strong> {audit.auditor}</div>
              <div><strong>Date:</strong> {new Date(audit.date).toLocaleDateString('fr-FR')}</div>
              <div><strong>Audité:</strong> {audit.auditee || 'Non défini'}</div>
              <div><strong>Taux de conformités:</strong> {calculateProgress(audit.items, audit.technical)}%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${calculateProgress(audit.items, audit.technical)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Audit Editor: Render Table
  const renderAuditTable = (title, items, tableKey) => (
    <div className="border border-gray-300 rounded overflow-hidden mb-5 bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-gray-50 p-3 text-left border-b border-gray-300 font-bold text-gray-700 w-12">NO</th>
            <th className="bg-gray-50 p-3 text-left border-b border-gray-300 font-bold text-gray-700 w-2/5">RÈGLE</th>
            <th className="bg-gray-50 p-3 text-left border-b border-gray-300 font-bold text-gray-700 w-20">RÉPONSE</th>
            <th className="bg-gray-50 p-3 text-left border-b border-gray-300 font-bold text-gray-700">COMMENTAIRE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4" className="text-center border-b border-gray-300 py-1 text-sm  text-gray-500 font-bold">{title}</td>
          </tr>
          {items.map((item, idx) => (
            <tr
              key={idx}
              className={`cursor-pointer border-b border-gray-200 transition-colors ${selectedRow.table === tableKey && selectedRow.index === idx ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'
                }`}
              onClick={() => setSelectedRow({ table: tableKey, index: idx })}
            >
              <td className="p-3 font-medium">{item.no}</td>
              <td className="p-3">
                <input
                  disabled
                  type="text"
                  value={item.question}
                  className={`w-full p-2 border rounded transition-colors ${selectedRow.table === tableKey && selectedRow.index === idx
                    ? 'bg-white bg-opacity-20 border-white border-opacity-50 text-white placeholder-gray-200'
                    : 'border-gray-300 text-gray-700 focus:border-blue-500 focus:outline-none'
                    }`}
                  onClick={e => e.stopPropagation()}
                />
              </td>
              <td className="p-3">
                {item.response ? (
                  <span className={`inline-block px-3 py-2 rounded text-sm font-bold min-w-16 text-center ${selectedRow.table === tableKey && selectedRow.index === idx ? 'bg-white bg-opacity-20' : getResponseClass(item.response)
                    }`}>
                    {item.response}
                  </span>
                ) : (
                  <span className={`inline-block px-3 py-2 rounded text-sm text-center min-w-16 ${selectedRow.table === tableKey && selectedRow.index === idx ? 'text-gray-200' : 'text-gray-400'
                    }`}>
                    {selectedRow.table === tableKey && selectedRow.index === idx ? 'Sélectionner' : 'Pas de réponse'}
                  </span>
                )}
              </td>
              <td className="p-3">
                {editingComment.table === tableKey && editingComment.index === idx ? (
                  <input
                    type="text"
                    value={item.commentaire}
                    onChange={e => updateComment(tableKey, idx, e.target.value)}
                    onBlur={() => setEditingComment({ table: null, index: null })}
                    onKeyPress={e => { if (e.key === 'Enter') setEditingComment({ table: null, index: null }); }}
                    placeholder="Tapez votre commentaire ici..."
                    className={`w-full p-2 border rounded transition-colors ${selectedRow.table === tableKey && selectedRow.index === idx
                      ? 'bg-white bg-opacity-20 border-white border-opacity-50 text-white placeholder-gray-200'
                      : 'border-gray-300 text-gray-700 focus:border-blue-500 focus:outline-none'
                      }`}
                    autoFocus
                    onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <span
                    className={`text-sm cursor-pointer hover:underline ${selectedRow.table === tableKey && selectedRow.index === idx ? 'text-white' : 'text-gray-700'
                      }`}
                    onClick={e => {
                      e.stopPropagation();
                      setEditingComment({ table: tableKey, index: idx });
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
  );

  // --- Audit Editor: Main
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

    // Data shortcut
    const { items = [], technical = [] } = currentAudit;

    return (
      <div className="p-5 bg-gray-50 min-h-[75vh] relative">
        {/* Audit Info */}
        <div className="mb-4 p-4 bg-gray-50 rounded">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre de l'audit</label>
              <input
                type="text"
                value={currentAudit.title}
                onChange={e => updateCurrentAudit({ ...currentAudit, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audité</label>
              <input
                disabled
                type="text"
                value="Ayoub BEN KHIROUN"
                className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
              />
            </div>
          </div>
        </div>

        <h3 className="text-gray-700 mb-2 text-lg"> Points à auditer </h3>
        {renderAuditTable('Modélisation', items, 'model')}
        {renderAuditTable('Migration', technical, 'tech')}

        {/* Sticky Decision Bar */}
        <div
          className="fixed left-0 right-0 bottom-0 z-40 bg-white border-t border-gray-200 shadow flex flex-col items-center py-3"
          style={{ transition: 'box-shadow 0.2s' }}
        >
          <div className="mb-1 text-sm text-gray-600 text-center">
            {selectedRow.index !== null ? (
              <span>
                {selectedRow.table === 'model' ? 'Modélisation' : 'Migration'} — Ligne {selectedRow.index + 1} :
                Cliquez sur un bouton ci-dessous pour définir la réponse
              </span>
            ) : (
              <span>Sélectionnez une ligne pour définir sa réponse</span>
            )}
          </div>
          <div className="flex justify-center gap-4 items-center flex-wrap">
            <button
              className={`flex flex-col items-center gap-1 p-3 border border-green-500 bg-white cursor-pointer rounded text-green-600 transition-all hover:-translate-y-1 hover:shadow-lg ${selectedRow.index === null ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              onClick={() => setResponse('OK')}
              disabled={selectedRow.index === null}
              title="Conforme"
            >
              <span className="text-xl">👍</span>
              <span className="text-sm">OK</span>
            </button>

            <button
              className={`flex flex-col items-center gap-1 p-3 border border-yellow-500 bg-white cursor-pointer rounded text-yellow-600 transition-all hover:-translate-y-1 hover:shadow-lg ${selectedRow.index === null ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              onClick={() => setResponse('NOT OK')}
              disabled={selectedRow.index === null}
              title="Non conforme"
            >
              <span className="text-xl">👎</span>
              <span className="text-sm">NOT OK</span>
            </button>
            <button
              className={`flex flex-col items-center gap-1 p-3 border border-gray-500 bg-white cursor-pointer rounded text-gray-600 transition-all hover:-translate-y-1 hover:shadow-lg ${selectedRow.index === null ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              onClick={() => setResponse('NA')}
              disabled={selectedRow.index === null}
              title="Non applicable"
            >
              <span className="text-xl">🚫</span>
              <span className="text-sm">NA</span>
            </button>
            <button
              className={`flex flex-col items-center gap-1 p-3 border border-blue-500 bg-white cursor-pointer rounded text-blue-600 transition-all hover:-translate-y-1 hover:shadow-lg ${selectedRow.index === null ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              onClick={() => setEditingComment(selectedRow)}
              disabled={selectedRow.index === null}
              title="Ajouter un commentaire"
            >
              <span className="text-xl">💬</span>
              <span className="text-sm">Commentaire</span>
            </button>
          </div>
        </div>
        <div className="pb-32" />
      </div>
    );
  };

  // ----------- RENDER -----------
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gray-200 flex items-center justify-center px-3 py-1 border-b border-gray-300">
        <div className="text-blue-700 font-bold flex items-center gap-2">
          MOHAMED ALI FRADI <span>👤</span>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-blue-700 flex justify-center text-white sticky top-0 z-30">
        <div className="flex">
          {['quiter', 'demarrer', 'audits', 'actions', 'planning', 'reporting'].map((tab) => (
            <div
              key={tab}
              className={`px-5 py-3 cursor-pointer border-r border-blue-800 transition-colors hover:bg-blue-800 ${activeTab === tab ? 'bg-blue-800' : ''
                }`}
              onClick={() => {
                setActiveTab(tab);
                if (tab === 'quiter') {
                  if (window.confirm('Êtes-vous sûr de vouloir quitter?')) {
                    setLoggedIn(false);
                    setActiveTab('audits')
                  }
                } else if (tab === 'demarrer') {
                  createNewAudit();
                } else if (tab === 'audits') {
                  setViewMode('list');
                  setCurrentAudit(null);
                  setCurrentAuditId(null);
                }
              }}
            >
              {tab === 'quiter' ? 'Quiter' :
                tab === 'demarrer' ? 'Démarrer AUDIT' :
                  tab.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* Audit Info Bar */}
      {currentAudit && activeTab === 'audits' && viewMode === 'editor' && (
        <div className="bg-blue-500 text-white px-5 py-2 text-sm">
          {currentAudit.title} | Auditeur : {currentAudit.auditor} | Audité : {currentAudit.auditee || 'Non défini'} | Taux de conformités : {calculateProgress(currentAudit.items, currentAudit.technical)}% | Statut : {currentAudit.status}
        </div>
      )}

      {/* Action Buttons */}
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
      <div className="max-w-4xl mx-auto">
        {activeTab === 'audits' && viewMode === 'editor' ? renderAuditEditor()
          : activeTab === 'audits' && viewMode === 'list' ? renderAuditsList()
            : activeTab === 'audits' ? renderAuditsList()
              : (
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
    </div>
  );
};

export default AuditApp;
