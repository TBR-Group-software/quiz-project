from django import template
import datetime

register = template.Library()


@register.filter()
def add_days(days):
    """Add days to current date."""
    newDate = datetime.date.today() + datetime.timedelta(days=days)
    return newDate
