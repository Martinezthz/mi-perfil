document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Llenar datos personales
            document.getElementById('nav-nombre').innerText = data.nombre;
            document.getElementById('hero-nombre').innerText = data.nombre;
            document.getElementById('hero-rol').innerText = data.rol;
            document.getElementById('bio-texto').innerText = data.bio;
            document.getElementById('year').innerText = new Date().getFullYear();

            // Configurar CV (Ver y Descargar)
            document.getElementById('btn-ver-cv').href = data.cv_url;
            document.getElementById('btn-descargar-cv').href = data.cv_url;

            // Renderizar Redes Sociales
            const redesCont = document.getElementById('redes-sociales');
            const iconos = {
                github: 'fab fa-github',
                linkedin: 'fab fa-linkedin',
                discord: 'fab fa-discord',
                email: 'fas fa-envelope'
            };

            Object.keys(data.redes).forEach(key => {
                let link = key === 'email' ? `mailto:${data.redes[key]}` : data.redes[key];
                if(key === 'discord') link = "#"; // Discord suele ser user, no link directo
                
                redesCont.innerHTML += `
                    <a href="${link}" target="_blank" class="text-3xl hover:text-blue-500 transition" title="${key}">
                        <i class="${iconos[key] || 'fas fa-link'}"></i>
                    </a>
                `;
            });

            // Renderizar Certificados
            const grid = document.getElementById('grid-certificados');
            data.certificados.forEach(cert => {
                grid.innerHTML += `
                    <div class="glass p-4 rounded-2xl card-hover flex flex-col">
                        <img src="${cert.imagen}" alt="${cert.titulo}" class="rounded-xl mb-4 w-full h-40 object-cover border border-blue-900/20">
                        <h4 class="text-xl font-bold mb-1">${cert.titulo}</h4>
                        <p class="text-sm text-blue-400 mb-4">${cert.institucion} • ${cert.fecha}</p>
                        <a href="${cert.link}" target="_blank" class="mt-auto text-sm font-semibold hover:underline text-slate-300">
                            Ver credencial <i class="fas fa-external-link-alt ml-1"></i>
                        </a>
                    </div>
                `;
            });
        });
});
