export const exportToCSV = (jsonData: any[]) => {
    const titleKeys = Object.keys(jsonData[0])
  
    const refinedData = []
    
    refinedData.push(titleKeys)
    
    jsonData.forEach(item => {
      refinedData.push(Object.values(item))  
    })
    
    
    let csvContent = ''
    
    refinedData.forEach(row => {
      csvContent += row.join(',') + '\n'
    })
    
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
    const objUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', objUrl)
    link.setAttribute('download', 'File.csv')
    link.textContent = 'Click to Download'
    
    document.querySelector('body')?.append(link);
    link.click();
    link.remove();
}