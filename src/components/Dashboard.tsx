import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { LogStats } from '../types/api'
import { useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
    const navigate = useNavigate()
    const [stats, setStats] = useState<LogStats>()

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get<LogStats>('/api/stats')
                setStats(response.data)
            } catch (error) {
                console.error('Erro ao trazer estatísticas:', error)
            }
        }
        fetchStats()
    }, [])

    const handleRedirect = () => {
        navigate('/convert-log');
    }

    /* const data = [
        { date: '2024-08-18', conversions: 2 },
        { date: '2024-08-17', conversions: 12 },
        { date: '2024-08-16', conversions: 8 },
        { date: '2024-08-15', conversions: 10 },
        { date: '2024-08-14', conversions: 8 },
        { date: '2024-08-13', conversions: 5 },
        { date: '2024-08-12', conversions: 1 },
    ] */

    return (
        <div>
            <h1>Dashboard</h1>
            {stats ? (
                <>
                    <p>Total de logs: {stats.totalLogs}</p>
                    <p>Total de conversões: {stats.totalConversions}</p>  
                    <h2>Conversões por dia</h2>
                    {/* O gráfico com data={data} é uma simulação */}
                    <BarChart width={600} height={300} data={stats.histogram}>{/* Para os dados dinâmicos, usar data={stats.histogram} */}
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="conversions" fill="#646cff" />
                    </BarChart>
                </>
            ) : (
                <p>Carregando estatísticas</p>
            )}
            <button onClick={handleRedirect}>Formatar log</button>
        </div>
    )
}

export default Dashboard