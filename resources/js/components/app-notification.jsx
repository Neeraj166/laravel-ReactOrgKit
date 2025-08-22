import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import AppIcon from '@/components/app-icon';
import { nanoid } from 'nanoid';
import { motion, AnimatePresence } from 'framer-motion';

const typeStyles = {
    success: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-300',
        icon: 'text-green-600',
    },
    error: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-300',
        icon: 'text-red-600',
    },
    warning: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-300',
        icon: 'text-yellow-600',
    },
    info: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-300',
        icon: 'text-blue-600',
    },
};

let externalAddNotification;

export const notify = (type, message) => {
    if (externalAddNotification) {
        externalAddNotification(type, message);
    } else {
        console.warn('Notification system not initialized yet.');
    }
};

const AppNotification = () => {
    const { flash } = usePage().props;
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        externalAddNotification = (type, message) => {
            setNotifications((prev) => [
                ...prev,
                { id: nanoid(), type, message },
            ]);
        };
    }, []);

    useEffect(() => {
        const generateId = () => nanoid();

        if (Array.isArray(flash)) {
            const newNotifs = flash?.map((f) => ({
                id: generateId(),
                message: f.message,
                type: f.responseType,
            }));
            setNotifications((prev) => [...prev, ...newNotifs]);
        } else if (flash?.success || flash?.error) {
            const id = generateId();
            setNotifications((prev) => [
                ...prev,
                {
                    id,
                    message: flash?.success || flash?.error,
                    type: flash?.success ? 'success' : 'error',
                },
            ]);
        }
    }, [flash]);

    const handleClose = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div className="fixed top-4 right-4 z-[999] flex flex-col items-end">
            <AnimatePresence>
                {notifications.map((notif) => (
                    <NotificationItem
                        key={notif.id}
                        id={notif.id}
                        message={notif.message}
                        type={notif.type}
                        onClose={handleClose}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

const NotificationItem = ({ id, message, type, onClose, delay = 3000 }) => {
    const style = typeStyles[type] || typeStyles.info;

    useEffect(() => {
        const timer = setTimeout(() => onClose(id), delay);
        return () => clearTimeout(timer);
    }, [id, onClose, delay]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-between gap-4 px-4 py-3 mb-3 rounded-lg shadow-lg border min-w-[250px] max-w-sm ${style.bg} ${style.text} ${style.border}`}
        >
            <div className="flex items-center gap-3">
                <div>
                    <AppIcon
                        name={type === 'error' ? 'x' : 'check'}
                        size={16}
                    />
                </div>
                <span className="text-sm font-medium">{message}</span>
            </div>
            <button
                onClick={() => onClose(id)}
                className="text-xl text-gray-500 hover:text-gray-700"
            >
                <AppIcon name={'x'} size={16} />
            </button>
        </motion.div>
    );
};

export default AppNotification;
