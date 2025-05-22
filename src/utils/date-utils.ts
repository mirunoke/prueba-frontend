export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "N/A";
  
  try {

    const formattedInput = typeof dateString === 'string' && dateString.includes(' ') 
      ? dateString.replace(' ', 'T') 
      : dateString;
    
    const date = new Date(formattedInput);
    

    if (isNaN(date.getTime())) {
      console.warn("Fecha inválida:", dateString);
      return String(dateString);
    }
    

    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error("Error al formatear fecha:", error);
    return String(dateString);
  }
}; 