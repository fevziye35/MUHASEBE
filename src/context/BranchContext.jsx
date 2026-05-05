import React, { createContext, useState, useContext, useEffect } from 'react';

const BranchContext = createContext();

const defaultBranches = [
  { id: 'merkez', name: 'Merkez Mağazası', icon: 'fa-building' },
  { id: 'sube1', name: 'Kadıköy Şubesi', icon: 'fa-shop' },
  { id: 'sube2', name: 'Beşiktaş Şubesi', icon: 'fa-shop' },
];

export const BranchProvider = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState(() => {
    const saved = localStorage.getItem('current_branch');
    const branch = defaultBranches.find(b => b.id === saved);
    return branch || defaultBranches[0];
  });

  const changeBranch = (branchId) => {
    const branch = defaultBranches.find(b => b.id === branchId);
    if (branch) {
      setCurrentBranch(branch);
      localStorage.setItem('current_branch', branch.id);
      // Reload to ensure all components refresh their data based on new branch
      window.location.reload();
    }
  };

  return (
    <BranchContext.Provider value={{ currentBranch, branches: defaultBranches, changeBranch }}>
      {children}
    </BranchContext.Provider>
  );
};

export const useBranch = () => useContext(BranchContext);
