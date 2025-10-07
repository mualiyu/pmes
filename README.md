# M&E Platform - Monitoring & Evaluation System

A comprehensive Monitoring & Evaluation (M&E) system built with Laravel and React, designed for organizations, NGOs, and government agencies to efficiently track programs, manage indicators, collect data, and generate reports.

## Features

- **User Management**: Role-based access control (Administrator, Program Manager, M&E Officer, Data Collector, etc.) with customizable permissions
- **Stakeholder Management**: Manage implementing organizations and partner agencies
- **Program Management**: Create and manage M&E programs with team member access control
- **Indicator Tracking**: Define indicators with status groups (e.g., Pending, In Progress, Validated, Completed)
- **Indicator Details**: Each indicator can have:
  - Assigned responsible officer
  - Due dates and milestones
  - Custom labels and categories
  - Time tracking (manual or timer-based)
  - File attachments and supporting documents
  - Subscribers and notifications
  - Comments and discussions
- **Advanced Filtering**: Efficient indicator organization and filtering
- **Real-time Updates**: Live notifications and data updates via WebSockets
- **Mentions**: Tag users in indicator descriptions and comments
- **My Work Dashboard**: Personalized view of assigned indicators for each user
- **Activity Logs**: Track all program and indicator activities
- **Data Collection**: Structured data entry and validation
- **Dashboard**: Program progress overview, overdue indicators, recent assignments, and activity feed
- **Reports**: Daily time logs, total logged time, and custom M&E reports
- **Dark Mode**: User preference support for light/dark themes

## Tech Stack

- **Backend**: [Laravel 11](https://laravel.com) (PHP 8.2+)
- **Frontend**: [React 18](https://react.dev)
- **Bridge**: [Inertia.js](https://inertiajs.com)
- **UI Components**: [Mantine](https://mantine.dev)
- **Real-time**: Pusher/Laravel Echo
- **Database**: MySQL/PostgreSQL

## Setup

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pmt
```

2. Install dependencies:
```bash
composer install
npm install
```

3. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

4. Set up database:
   - Create a database for the application
   - Update `.env` with database credentials (variables prefixed with `DB_`)

5. Run migrations and seeders:
```bash
php artisan migrate --seed
```

#### Development

6. For development/testing, answer `yes` when asked to seed development data
7. Start the development server:
```bash
npm run dev
```

> **Note**: [Laravel Sail](https://laravel.com/docs/11.x/sail) is recommended for development environment

#### Production

6. For production, answer `no` when asked to seed development data
7. Install production dependencies:
```bash
composer install --no-dev
```

8. Optimize Laravel:
```bash
php artisan optimize
php artisan storage:link
```

9. Set up task scheduler (add to crontab with `crontab -e`):
```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

10. Configure queue workers:
    - Set `QUEUE_CONNECTION=database` in `.env`
    - Set up [Supervisor](https://laravel.com/docs/11.x/queues#supervisor-configuration) to run:
    ```bash
    php artisan queue:work --queue=default,email
    ```

11. Configure email:
    - Update `MAIL_*` variables in `.env`

12. Build frontend assets:
```bash
npm run build
```

### Default Admin Account

After running migrations with seed:

- **Email**: `admin@mail.com`
- **Password**: `password`

> **Important**: Change these credentials immediately in production!

### WebSocket Configuration

For real-time notifications, configure [Pusher](https://pusher.com) or use [open source alternatives](https://laravel.com/docs/11.x/broadcasting#open-source-alternatives).

Update `.env` with Pusher credentials (variables with `PUSHER_` prefix).

### Social Login (Optional)

To enable Google OAuth:

1. Set up "OAuth consent screen" on [Google Console](https://console.cloud.google.com/apis/credentials/consent)
2. Create "OAuth Client ID" (Web application type) on [Google Console](https://console.cloud.google.com/apis/credentials)
3. Add credentials to `.env`:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

## Roadmap

- [x] Kanban view for indicators
- [x] Expense and profit calculation reports
- [ ] Program notes and documentation section
- [ ] Multiple users logging time on indicators
- [ ] Change history tracking for indicators
- [ ] User-specific permission overrides
- [ ] Mobile responsive design
- [ ] Rich text editor emoji support
- [ ] Comprehensive testing suite
- [ ] Performance optimization
- [ ] TypeScript migration

## License

Open source project. Feel free to use and customize for your M&E needs.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## Support

For questions and support, please open an issue in the repository.
