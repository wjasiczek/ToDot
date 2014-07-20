using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDo.Models
{
    public class ToDoModel
    {
        public string ToDoText { get; set; }

        public DateTime DateAdded { get; set; }

        public bool IsCompleted { get; set; }
    }
}