import Options from './components/Options.svelte';
import './options.css';

const target = document.getElementById('app');

function render() {
    new Options({ target });
}

document.addEventListener('DOMContentLoaded', render);
