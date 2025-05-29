import React, { createContext, useContext, useState } from 'react';

interface DataCompressionContextType {
    enabled: boolean;
    setEnabled: (v: boolean) => void;
}

const DataCompressionContext = createContext<DataCompressionContextType>({
    enabled: true,
    setEnabled: () => { },
});

export function DataCompressionProvider({ children }: { children: React.ReactNode }) {
    const [enabled, setEnabled] = useState(true);
    return (
        <DataCompressionContext.Provider value={{ enabled, setEnabled }}>
            {children}
        </DataCompressionContext.Provider>
    );
}

export function useDataCompression() {
    return useContext(DataCompressionContext);
}
