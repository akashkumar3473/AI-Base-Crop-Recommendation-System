import Card from './Card';

const QuickActions = ({ setPage, t }) => (
    <Card className="hover:-translate-y-2 hover:shadow-green-200/50">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t.quickActions}</h3>
        <div className="space-y-4">
            <button
                onClick={() => setPage('notifications')}
                className="w-full flex items-center justify-center text-center bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
                {t.viewNotifications}
            </button>
        </div>
    </Card>
);

export default QuickActions;