export function hasSpecialCharacters(str: string): boolean {
    for (var i = 0; i < str.length; i++) {
      var charCode = str.charCodeAt(i);
      if ((charCode >= 33 && charCode <= 47) || 
          (charCode >= 58 && charCode <= 64) || 
          (charCode >= 91 && charCode <= 96) || 
          (charCode >= 123 && charCode <= 126)) {
        return true;
      }
    }
    return false;
  }