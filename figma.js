 // Data
        let transactions = [
            { id: 1, description: 'Salary', amount: 3500, category: 'Salary', type: 'income', date: '2024-02-01', icon: '💼' },
            { id: 2, description: 'Grocery Shopping', amount: -120.50, category: 'Food & Dining', type: 'expense', date: '2024-02-15', icon: '🍔' },
            { id: 3, description: 'Electric Bill', amount: -85.30, category: 'Utilities', type: 'expense', date: '2024-02-10', icon: '💡' },
            { id: 4, description: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', type: 'expense', date: '2024-02-05', icon: '🎬' },
            { id: 5, description: 'Uber Ride', amount: -25.40, category: 'Transportation', type: 'expense', date: '2024-02-12', icon: '🚗' },
            { id: 6, description: 'Coffee Shop', amount: -8.75, category: 'Food & Dining', type: 'expense', date: '2024-02-14', icon: '☕' },
            { id: 7, description: 'Online Shopping', amount: -89.99, category: 'Shopping', type: 'expense', date: '2024-02-18', icon: '🛍️' },
            { id: 8, description: 'Restaurant Dinner', amount: -65.20, category: 'Food & Dining', type: 'expense', date: '2024-02-20', icon: '🍽️' },
            { id: 9, description: 'Gas Station', amount: -45.00, category: 'Transportation', type: 'expense', date: '2024-02-22', icon: '⛽' },
            { id: 10, description: 'Movie Tickets', amount: -28.50, category: 'Entertainment', type: 'expense', date: '2024-02-25', icon: '🎬' }
        ];

        const budgetCategories = [
            { name: 'Food & Dining', allocated: 450, spent: 201.45, color: '#ef4444', icon: '🍔' },
            { name: 'Shopping', allocated: 300, spent: 89.99, color: '#f59e0b', icon: '🛍️' },
            { name: 'Transportation', allocated: 200, spent: 70.40, color: '#3b82f6', icon: '🚗' },
            { name: 'Entertainment', allocated: 150, spent: 44.49, color: '#8b5cf6', icon: '🎬' },
            { name: 'Utilities', allocated: 400, spent: 85.30, color: '#10b981', icon: '💡' },
            { name: 'Healthcare', allocated: 500, spent: 0, color: '#ec4899', icon: '🏥' }
        ];

        const monthlyData = [
            { month: 'Sep', income: 3200, expenses: 1800 },
            { month: 'Oct', income: 3400, expenses: 1500 },
            { month: 'Nov', income: 3300, expenses: 1650 },
            { month: 'Dec', income: 3600, expenses: 1900 },
            { month: 'Jan', income: 3500, expenses: 1200 },
            { month: 'Feb', income: 3500, expenses: 1076 }
        ];

        let currentTransactionType = 'expense';
        let balanceVisible = true;

        // Chart instances
        let monthlyChart = null;
        let categoryPieChart = null;
        let incomeExpenseChart = null;
        let trendChart = null;

        // Navigation
        function navigateTo(page) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            document.getElementById(page).classList.add('active');
            document.querySelector(`[data-page="${page}"]`).classList.add('active');

            // Render charts when navigating to pages
            if (page === 'dashboard') {
                setTimeout(renderMonthlyChart, 100);
            } else if (page === 'analytics') {
                setTimeout(() => {
                    renderCategoryPieChart();
                    renderIncomeExpenseChart();
                    renderTrendChart();
                }, 100);
            }
        }

        // Event listeners for navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                navigateTo(page);
            });
        });

        // Toggle balance visibility
        function toggleBalance() {
            balanceVisible = !balanceVisible;
            const balanceEl = document.getElementById('balance-value');
            if (balanceVisible) {
                balanceEl.textContent = '₹12,458.50';
            } else {
                balanceEl.textContent = '••••••';
            }
        }

        // Render transactions
        function renderRecentTransactions() {
            const container = document.getElementById('recent-transactions');
            const recent = transactions.slice(0, 5);
            
            container.innerHTML = recent.map(t => `
                <div class="transaction-item">
                    <div class="transaction-icon ${t.type}">
                        ${t.icon}
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-name">${t.description}</div>
                        <div class="transaction-category">${t.category}</div>
                    </div>
                    <div class="transaction-amount">
                        <div class="transaction-amount-value ${t.type}">
                            ${t.type === 'income' ? '+' : ''}₹${Math.abs(t.amount).toFixed(2)}
                        </div>
                        <div class="transaction-date">${new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </div>
                </div>
            `).join('');
        }

        function renderTransactionsTable() {
            const tbody = document.getElementById('transactions-table');
            
            tbody.innerHTML = transactions.map(t => `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="transaction-icon ${t.type}" style="width: 40px; height: 40px;">
                                ${t.icon}
                            </div>
                            <span style="font-weight: 600; color: #1e293b;">${t.description}</span>
                        </div>
                    </td>
                    <td>
                        <span style="display: inline-block; padding: 4px 12px; background: #f1f5f9; border-radius: 99px; font-size: 12px; font-weight: 500;">
                            ${t.category}
                        </span>
                    </td>
                    <td style="color: #64748b;">
                        ${new Date(t.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td style="text-align: right;">
                        <span style="font-weight: 600; color: ${t.type === 'income' ? '#10b981' : '#ef4444'};">
                            ${t.type === 'income' ? '+' : ''}₹${Math.abs(t.amount).toFixed(2)}
                        </span>
                    </td>
                </tr>
            `).join('');
        }

        function renderBudgetCategories() {
            const container = document.getElementById('budget-categories');
            
            container.innerHTML = budgetCategories.map(cat => {
                const percentage = (cat.spent / cat.allocated) * 100;
                const remaining = cat.allocated - cat.spent;
                const isOverBudget = remaining < 0;

                return `
                    <div class="budget-category">
                        <div class="category-header">
                            <div class="category-info">
                                <div class="category-icon" style="background-color: ${cat.color}20; color: ${cat.color};">
                                    ${cat.icon}
                                </div>
                                <div>
                                    <div class="category-name">${cat.name}</div>
                                    <div class="category-spent">₹${cat.spent.toFixed(2)} of ₹${cat.allocated.toFixed(2)}</div>
                                </div>
                            </div>
                            <div class="category-remaining" style="color: ${isOverBudget ? '#ef4444' : remaining < 50 ? '#f59e0b' : '#10b981'};">
                                ${isOverBudget ? '-' : ''}₹${Math.abs(remaining).toFixed(2)}
                            </div>
                        </div>
                        <div class="category-bar">
                            <div class="category-bar-fill" style="width: ${Math.min(percentage, 100)}%; background: ${cat.color};"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Chart rendering functions
        function renderMonthlyChart() {
            const ctx = document.getElementById('monthly-chart');
            if (!ctx) return;

            if (monthlyChart) {
                monthlyChart.destroy();
            }

            monthlyChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: monthlyData.map(d => d.month),
                    datasets: [
                        {
                            label: 'Income',
                            data: monthlyData.map(d => d.income),
                            backgroundColor: '#10b981',
                            borderRadius: 8,
                        },
                        {
                            label: 'Expenses',
                            data: monthlyData.map(d => d.expenses),
                            backgroundColor: '#ef4444',
                            borderRadius: 8,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '₹' + value;
                                }
                            }
                        }
                    }
                }
            });
        }

        function renderCategoryPieChart() {
            const ctx = document.getElementById('category-pie-chart');
            if (!ctx) return;

            if (categoryPieChart) {
                categoryPieChart.destroy();
            }

            categoryPieChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: budgetCategories.map(c => c.name),
                    datasets: [{
                        data: budgetCategories.map(c => c.spent),
                        backgroundColor: budgetCategories.map(c => c.color),
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    return label + ': ₹' + value.toFixed(2);
                                }
                            }
                        }
                    }
                }
            });
        }

        function renderIncomeExpenseChart() {
            const ctx = document.getElementById('income-expense-chart');
            if (!ctx) return;

            if (incomeExpenseChart) {
                incomeExpenseChart.destroy();
            }

            const totalIncome = 3500;
            const totalExpenses = 1076;

            incomeExpenseChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Income', 'Expenses', 'Savings'],
                    datasets: [{
                        data: [totalIncome, totalExpenses, totalIncome - totalExpenses],
                        backgroundColor: ['#10b981', '#ef4444', '#3b82f6'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    return label + ': ₹' + value.toFixed(2);
                                }
                            }
                        }
                    }
                }
            });
        }

        function renderTrendChart() {
            const ctx = document.getElementById('trend-chart');
            if (!ctx) return;

            if (trendChart) {
                trendChart.destroy();
            }

            trendChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: monthlyData.map(d => d.month),
                    datasets: [
                        {
                            label: 'Income',
                            data: monthlyData.map(d => d.income),
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 5,
                            pointHoverRadius: 7
                        },
                        {
                            label: 'Expenses',
                            data: monthlyData.map(d => d.expenses),
                            borderColor: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 5,
                            pointHoverRadius: 7
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.dataset.label || '';
                                    const value = context.parsed.y || 0;
                                    return label + ': ₹' + value.toFixed(2);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '₹' + value;
                                }
                            }
                        }
                    }
                }
            });
        }

        // Modal functions
        function openAddTransactionModal() {
            document.getElementById('transaction-modal').classList.add('active');
            document.getElementById('transaction-date').value = new Date().toISOString().split('T')[0];
        }

        function closeModal() {
            document.getElementById('transaction-modal').classList.remove('active');
        }

        function setTransactionType(type) {
            currentTransactionType = type;
            document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`.toggle-btn.${type}`).classList.add('active');
        }

        function addTransaction() {
            const description = document.getElementById('transaction-description').value;
            const amount = parseFloat(document.getElementById('transaction-amount').value);
            const category = document.getElementById('transaction-category').value;
            const date = document.getElementById('transaction-date').value;

            if (!description || !amount || !date) {
                alert('Please fill in all fields');
                return;
            }

            const categoryIcons = {
                'Food & Dining': '🍔',
                'Shopping': '🛍️',
                'Transportation': '🚗',
                'Entertainment': '🎬',
                'Utilities': '💡',
                'Healthcare': '🏥',
                'Salary': '💼',
                'Other': '📦'
            };

            const newTransaction = {
                id: transactions.length + 1,
                description,
                amount: currentTransactionType === 'expense' ? -Math.abs(amount) : Math.abs(amount),
                category,
                type: currentTransactionType,
                date,
                icon: categoryIcons[category] || '📦'
            };

            transactions.unshift(newTransaction);
            
            renderRecentTransactions();
            renderTransactionsTable();
            closeModal();

            // Reset form
            document.getElementById('transaction-description').value = '';
            document.getElementById('transaction-amount').value = '';
            
            alert('Transaction added successfully!');
        }

        function toggleSwitch(element) {
            element.classList.toggle('active');
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            renderRecentTransactions();
            renderTransactionsTable();
            renderBudgetCategories();
            renderMonthlyChart();
            
            // Set today's date as default
            const dateInput = document.getElementById('transaction-date');
            if (dateInput) {
                dateInput.value = new Date().toISOString().split('T')[0];
            }
        });
    
