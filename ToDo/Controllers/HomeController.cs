using System;
using System.Web.Mvc;
using ToDo.Models;
using System.Collections.Generic;
using System.Diagnostics;

namespace ToDo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }
    }
}