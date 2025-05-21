// Substitua todo o script por:
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar usuários padrão
    if (!localStorage.getItem('users')) {
        const defaultUsers = [{
            id: 1,
            username: 'admin',
            password: 'admin123', // Em sistema real, usar hash
            role: 'admin',
            criadoEm: new Date().toISOString()
        }];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
});

document.getElementById('novoUsuario').addEventListener('change', function (e) {
    document.getElementById('campoTipoUsuario').classList.toggle('d-none', !e.target.checked);
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users'));
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isNewUser = document.getElementById('novoUsuario').checked;

    if (isNewUser) {
        // Validação de novo usuário
        if (users.some(u => u.username === username)) {
            return alert('Usuário já existe!');
        }

        const newUser = {
            id: Date.now(),
            username,
            password, // Em sistema real: usar bcrypt ou similar
            role: document.getElementById('userType').value,
            criadoEm: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Conta criada com sucesso!');
        return;
    }

    // Login normal
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = user.role === 'admin' ? 'admin.html' : 'tecnico.html';
    } else {
        alert('Credenciais inválidas!');
    }
});