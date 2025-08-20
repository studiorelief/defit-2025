interface StatsData {
  numberOfPlayers: number;
  numberOfActivities: number;
  totalDistance: number;
}

interface CachedData {
  data: StatsData;
  timestamp: number;
}

const CACHE_KEY = 'defit_stats_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

/**
 * Formate un nombre en millions arrondi à l'entier
 * @param value - Le nombre à formater
 * @returns Le nombre formaté en millions (ex: 2138375 -> 2, 29120789 -> 30)
 */
function formatToMillion(value: number): number {
  return Math.round(value / 1000000);
}

/**
 * Vérifie si les données en cache sont encore valides
 * @param cachedData - Les données mises en cache
 * @returns true si le cache est valide, false sinon
 */
function isCacheValid(cachedData: CachedData): boolean {
  const now = Date.now();
  return now - cachedData.timestamp < CACHE_DURATION;
}

/**
 * Récupère les données depuis le localStorage
 * @returns Les données mises en cache ou null si inexistantes/invalides
 */
function getFromCache(): StatsData | null {
  try {
    const cachedString = localStorage.getItem(CACHE_KEY);
    if (!cachedString) return null;

    const cachedData: CachedData = JSON.parse(cachedString);

    if (isCacheValid(cachedData)) {
      return cachedData.data;
    }

    // Cache expiré, on le supprime
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.error('Erreur lors de la lecture du cache:', error);
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

/**
 * Sauvegarde les données dans le localStorage
 * @param data - Les données à sauvegarder
 */
function saveToCache(data: StatsData): void {
  try {
    const cachedData: CachedData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde en cache:', error);
  }
}

/**
 * Récupère les données depuis l'API
 * @returns Promise avec les données de l'API
 */
async function fetchStatsFromAPI(): Promise<StatsData> {
  const response = await fetch('https://api.360wellness.io/auth/public/hero/stat');

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Met à jour les éléments DOM avec les données formatées
 * @param activities - Nombre d'activités formaté
 * @param distance - Distance totale formatée
 */
function updateDOM(activities: number, distance: number): void {
  const activitiesElement = document.querySelector('.activities');
  const kilometersElement = document.querySelector('.kilometers');

  if (activitiesElement) {
    activitiesElement.textContent = activities.toString();
  } else {
    // console.warn('Élément .activities non trouvé dans le DOM');
  }

  if (kilometersElement) {
    kilometersElement.textContent = distance.toString();
  } else {
    // console.warn('Élément .kilometers non trouvé dans le DOM');
  }
}

/**
 * Fonction principale pour récupérer et afficher les statistiques
 * Utilise un système de cache pour éviter les appels répétés à l'API
 */
export async function getNumbers(): Promise<void> {
  try {
    // Vérifier d'abord le cache
    let statsData = getFromCache();

    // Si pas de cache valide, récupérer depuis l'API
    if (!statsData) {
      //   console.log("Récupération des données depuis l'API...");
      statsData = await fetchStatsFromAPI();
      saveToCache(statsData);
    } else {
      //   console.log('Utilisation des données en cache');
    }

    // Formater les données
    const formattedActivities = formatToMillion(statsData.numberOfActivities);
    const formattedDistance = formatToMillion(statsData.totalDistance);

    // Mettre à jour le DOM
    updateDOM(formattedActivities, formattedDistance);

    // console.log(`Activités: ${statsData.numberOfActivities} -> ${formattedActivities}M`);
    // console.log(`Distance: ${statsData.totalDistance} -> ${formattedDistance}M km`);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);

    // En cas d'erreur, essayer d'utiliser le cache même s'il est expiré
    const expiredCache = localStorage.getItem(CACHE_KEY);
    if (expiredCache) {
      try {
        const cachedData: CachedData = JSON.parse(expiredCache);
        const formattedActivities = formatToMillion(cachedData.data.numberOfActivities);
        const formattedDistance = formatToMillion(cachedData.data.totalDistance);
        updateDOM(formattedActivities, formattedDistance);
        // console.log('Utilisation du cache expiré en fallback');
      } catch (fallbackError) {
        console.error("Impossible d'utiliser le cache en fallback:", fallbackError);
      }
    }
  }
}
