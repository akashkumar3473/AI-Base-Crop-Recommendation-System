import Card from './Card';
import CheckCircleIcon from './icons/CheckCircleIcon';
import AlertTriangleIcon from './icons/AlertTriangleIcon';

const RecentActivity = ({ t }) => (
    <Card className="hover:-translate-y-2 hover:shadow-green-200/50">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t.recentActivity}</h3>
        <ul className="space-y-4">
            <li className="flex items-start space-x-4 p-3 bg-green-50 rounded-lg">
                <CheckCircleIcon />
                <div>
                    <p className="font-semibold text-gray-800">{t.dataUpdated}</p>
                    <p className="text-sm text-gray-500">2s {t.ago}</p>
                </div>
            </li>
            <li className="flex items-start space-x-4 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangleIcon />
                <div>
                    <p className="font-semibold text-gray-800">{t.tankApproachingCapacity}</p>
                    <p className="text-sm text-gray-500">2 hours {t.ago}</p>
                </div>
            </li>
        </ul>
    </Card>
);

export default RecentActivity;