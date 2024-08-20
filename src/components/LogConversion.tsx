import React, { useState } from 'react'
import axios from 'axios'

const LogConversion: React.FC = () => {
    const [sourceUrl, setSourceUrl] = useState<string>('')
    const [minhaCdnLog, setMinhaCdnLog] = useState<string>('')
    const [agoraLog, setAgoraLog] = useState<string>('')
    const handleFetchLog = async () => {
        try {
            const response = await axios.get<string>(sourceUrl)
            setMinhaCdnLog(response.data)   
            const convertResponse = await axios.get<string>('/api/convert-log', { params: { sourceUrl } })
            setAgoraLog(convertResponse.data)
        } catch (error) {
            console.error('Erro ao buscar ou converter o log:', error)
        }
    }   
    const handleDownload = () => {
        const blob = new Blob([agoraLog], { type: 'text/plain' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'converted_log.txt'
        link.click()
    }   
    return (
        <div>
            <h1>Conversor de log</h1>
            <input
                type="text"
                placeholder="Enter URL of MINHA CDN log"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
            />
            <button onClick={handleFetchLog}>Converter</button> 
            <section>
                <h2>MINHA CDN Log</h2>
                <pre>{minhaCdnLog}</pre>
            </section>    
            <section>
                <h2>Agora Log</h2>
                <pre>{agoraLog}</pre>
            </section>
            {agoraLog && <button onClick={handleDownload}>Baixar log formatado</button>}
        </div>
    )
}

export default LogConversion